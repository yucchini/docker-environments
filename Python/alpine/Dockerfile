FROM python:3.6-alpine
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY ./requirements.txt /requirements.txt
RUN apk --update-cache add python3-dev sqlite sqlite-dev zsh \
    gcc libc-dev linux-headers
RUN pip3 install --upgrade pip
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/
