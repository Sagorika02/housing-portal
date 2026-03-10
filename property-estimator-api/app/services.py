import requests
from .config import ML_SERVICE_URL


def call_ml_model(data: dict):

    try:

        response = requests.post(
            ML_SERVICE_URL,
            json=data,
            timeout=10
        )

        response.raise_for_status()

        result = response.json()

        return {
            "predictions": result["predicted_prices"]
        }

    except requests.exceptions.Timeout:
        raise Exception("ML service timeout")

    except requests.exceptions.ConnectionError:
        raise Exception("ML service unavailable")

    except requests.exceptions.HTTPError as e:
        raise Exception(f"ML service error: {str(e)}")

    except KeyError:
        raise Exception("Invalid response format from ML service")