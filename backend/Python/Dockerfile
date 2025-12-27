FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create credentials file at runtime (NO code changes)
RUN echo '#!/bin/sh\n\
echo "$GOOGLE_APPLICATION_CREDENTIALS_B64" | base64 -d > /app/gcloud-key.json\n\
export GOOGLE_APPLICATION_CREDENTIALS=/app/gcloud-key.json\n\
exec "$@"' > /entrypoint.sh \
    && chmod +x /entrypoint.sh

ENV GOOGLE_APPLICATION_CREDENTIALS=/app/gcloud-key.json

EXPOSE 10000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
