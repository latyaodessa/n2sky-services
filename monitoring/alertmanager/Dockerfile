FROM prom/alertmanager:v0.10.0
COPY alertmanager.yml /etc/alertmanager/config.yml
ENTRYPOINT [ "/bin/alertmanager" ]
CMD        [ "-config.file=/etc/alertmanager/config.yml", \
             "-storage.path=/alertmanager" ]
