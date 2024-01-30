# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/
#FROM postgres
#ENV POSTGRES_DB=postgres

ARG PYTHON_VERSION=3.11.3
FROM python
#:${PYTHON_VERSION}-slim as base

# Prevents Python from writing pyc files.
#ENV PYTHONDONTWRITEBYTECODE=1

# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1



WORKDIR /app

#RUN pip install django django-rest-framework django-cors-headers

COPY . .

RUN --mount=type=cache,target=/root/.cache/pip

#RUN #apt install postgresql

RUN python3 -m pip install --upgrade pip
RUN pip install -r requirements.txt

ARG UID=10002
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

USER appuser

EXPOSE 8000

CMD ["python", "manage.py", "migrate"]




#RUN mkdir -p /schedulerApp
#
#COPY requirements.txt /schedulerApp
#
#RUN ls /schedulerApp
#
#CMD python manage.py runserver
#COPY . /schedulerApp
#
#WORKDIR /schedulerApp
#
# Create a non-privileged user that the app will run under.
# See https://docs.docker.com/go/dockerfile-user-best-practices/

#
#
## Download dependencies as a separate step to take advantage of Docker's caching.
## Leverage a cache mount to /root/.cache/pip to speed up subsequent builds.
## Leverage a bind mount to requirements.txt to avoid having to copy them into
## into this layer.

##RUN ls -a

#

#
## Copy the source code into the container.
#COPY schedulerApp .
#
## Expose the port that the application listens on.
#EXPOSE 8000
#
## Run the application.
#CMD python manage.py runserver
