from rest_framework.exceptions import ErrorDetail


def error_response(serializer) -> str:
    error_messages = []

    # Iterate over the error messages
    for error in serializer.errors.values():
        # for error in field_errors:
        if "message" in error and isinstance(error["message"], ErrorDetail):
            error_messages.append(str(error["message"]))
        else:
            error_messages.append(error[0])

    # Join all error messages into a single string
    all_errors = ". ".join(error_messages)
    return all_errors
