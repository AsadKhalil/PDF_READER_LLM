import requests
from django.conf import settings


def ai_response(base64_image=None, message_history=None, text=None):
    """
    This Python function named `ai_response` takes in a base64 image, message history, and optional text
    input as parameters.

    :param base64_image: Base64 encoded image data that the AI can use for processing and analysis. This
    parameter allows the AI to receive image data in a format that can be easily decoded and used within
    the code
    :param message_history: The `message_history` parameter is a list that contains the history of
    messages exchanged in the conversation. Each element in the list represents a message that has been
    sent or received in the conversation up to the current point
    :param text: The `ai_response` function seems to take in three parameters: `base64_image`,
    `message_history`, and `text`. The `base64_image` parameter likely contains an image encoded in
    base64 format. The `message_history` parameter may store previous messages or conversation history.
    The purpose of
    """

    OPEN_API_KEY = settings.OPEN_API_KEY
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {OPEN_API_KEY}",
    }

    messages_payload = [
        {"role": msg["role"], "content": msg["content"]} for msg in message_history
    ]
    if base64_image:
        messages_payload.append(
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": f"{text}"},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},
                    },
                ],
            }
        )
    else:
        messages_payload.append(
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": f"{text}"},
                ],
            }
        )

    payload = {
        "model": "gpt-4-1106-vision-preview",
        "messages": messages_payload,
        "max_tokens": 300,
    }

    response = requests.post(
        "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
    )
    if response.status_code == 200:
        response_data = response.json()
        response_text = response_data["choices"][0]["message"]["content"]
        role = response_data["choices"][0]["message"]["role"]
        return response_text
    else:
        raise Exception("Failed to get a valid response from OpenAI API")
