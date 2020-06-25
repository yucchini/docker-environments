FROM nginx:1.18.0-alpine

# インクルード用のディレクトリ内を削除
RUN rm -f /etc/nginx/conf.d/*

COPY docker/Nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# ビルド完了後にNginxを起動
CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
