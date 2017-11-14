
FROM prom/prometheus:v2.0.0-beta.2
COPY alert.rules /etc/prometheus/alert.rules
COPY test.rules /etc/prometheus/test.rules
COPY node.rules /etc/prometheus/node.rules
COPY ./prometheus.yml /etc/prometheus/prometheus.yml
