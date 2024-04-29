from rest_framework.routers import DefaultRouter

from .viewsets import ChatViewSet, LoginViewSet, MessageViewSet, SignupViewSet

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register(r"chats", ChatViewSet)
router.register(r"messages", MessageViewSet)

# urlpatterns = [
#     path("", include(router.urls)),
# ]

urlpatterns = []
urlpatterns += router.urls
