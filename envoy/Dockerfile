FROM envoyproxy/envoy-alpine-debug-dev
COPY envoy-lbcs.yaml /etc/envoy/envoy.yaml
RUN ln -sf /dev/stdout /var/log/envoy.log

