FROM prom/alertmanager:latest
COPY simple.yml /etc/alertmanager/config.yml
ENTRYPOINT [ "/bin/alertmanager" ]
CMD        [ "-config.file=/etc/alertmanager/config.yml", \
             "-storage.path=/alertmanager" ]
