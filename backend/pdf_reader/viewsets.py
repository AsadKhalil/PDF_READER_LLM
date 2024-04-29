import base64
import io

from PIL import Image
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet
from utils.chat_ai import ai_response  # Hypothetical AI module
from utils.response import error_response

from .models import Chat, Message
from .serializers import (
    ChatSerializer,
    LoginAuthTokenSerializer,
    MessageSerializer,
    SignupSerializer,
)


class SignupViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = SignupSerializer
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(request=request)

            # Create token for the new user
            token, created = Token.objects.get_or_create(user=user)

            response_data = {
                "token": token.key,
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        else:
            error = error_response(serializer)
            return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = LoginAuthTokenSerializer
    permission_classes = [AllowAny]

    def create(self, request):

        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            token, created = Token.objects.get_or_create(user=user)

            return Response(
                {
                    "token": token.key,
                }
            )
        else:
            error = error_response(serializer)
            return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)


class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chat.objects.filter(user=self.request.user)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def encode_image(self, image_bytes):
        """Encode image bytes to base64."""
        return base64.b64encode(image_bytes).decode("utf-8")

    def convert_pdf_to_image(self, pdf_file):
        """Convert PDF file to image and return as a base64 string."""
        images = convert_from_bytes(pdf_file.read())
        if images:
            img_byte_arr = io.BytesIO()
            images[0].save(img_byte_arr, format="JPEG")
            img_byte_arr = img_byte_arr.getvalue()
            return self.encode_image(img_byte_arr)
        return None

    def get_chat(self, chat_id, user):
        """Retrieve an existing chat or create a new one."""
        return Chat.objects.filter(
            id=chat_id, user=user
        ).first() or Chat.objects.create(user=user)

    def get_message_history(self, chat):
        """Build message history for AI context."""
        return [
            {
                "role": "user" if not msg.sent_by_ai else "assistant",
                "content": msg.text,
            }
            for msg in Message.objects.filter(chat=chat)
        ]

    def handle_file_input(self, file_obj, text, chat, message_history):
        """Process file input and create messages."""
        if not text:
            text = "Give Summary hide social security number"
        else:
            text += " hide social security number"

        base64_image = None
        if file_obj.content_type.startswith("image/"):
            base64_image = self.encode_image(file_obj)
        elif file_obj.content_type == "application/pdf":
            base64_image = self.convert_pdf_to_image(file_obj)
        else:
            return {
                "error": "Unsupported file type provided.",
                "status": status.HTTP_400_BAD_REQUEST,
            }

        if base64_image:
            try:
                response_text = ai_response(base64_image, message_history, text)
                self.create_message(chat, text, False)
                self.create_message(chat, response_text, True)
                return {"message": response_text, "status": status.HTTP_201_CREATED}
            except Exception as e:
                return {
                    "error": str(e),
                    "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                }
        return {
            "error": "Failed to process the file.",
            "status": status.HTTP_400_BAD_REQUEST,
        }

    def create_message(self, chat, text, is_ai):
        """Helper function to create a message in the database."""
        Message.objects.create(chat=chat, text=text, sent_by_ai=is_ai)

    def create(self, request, *args, **kwargs):
        chat_id = request.data.get("chat_id")
        file_obj = request.FILES.get("file")
        text = request.data.get("text", "")
        if chat_id == "null":
            chat_id = None
        chat = self.get_chat(chat_id, request.user)
        message_history = self.get_message_history(chat)

        if file_obj:
            result = self.handle_file_input(file_obj, text, chat, message_history)
        elif text:
            response_text = ai_response(
                base64_image=None, message_history=message_history, text=text
            )
            self.create_message(chat, text, False)
            self.create_message(chat, response_text, True)
            result = {
                "message": response_text,
                "chat_id": chat.id,
                "status": status.HTTP_200_OK,
            }
        else:
            result = {
                "error": "No valid input provided",
                "status": status.HTTP_400_BAD_REQUEST,
            }

        if "error" in result:
            return Response({"error": result["error"]}, status=result["status"])
        return Response(
            {
                "message": result["message"],
                "chat_id": chat.id,
            },
            status=result["status"],
        )
