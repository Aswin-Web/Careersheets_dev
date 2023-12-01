# FROM docker.elastic.co/elasticsearch/elasticsearch:7.10.0

# Set environment variables
# ENV discovery.type=single-node

# Expose ports
# EXPOSE 9200 9300



# Use a minimal Alpine Linux base image
FROM alpine:latest

# Set environment variables
ENV ELASTICSEARCH_VERSION=7.14.0 \
    ELASTICSEARCH_HOME=/usr/share/elasticsearch \
    PATH=/usr/share/elasticsearch/bin:$PATH

# Install required dependencies
RUN apk add --no-cache openjdk11-jre

# Download and install Elasticsearch
RUN wget -qO - https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-${ELASTICSEARCH_VERSION}-linux-x86_64.tar.gz | tar xz \
    && mv elasticsearch-${ELASTICSEARCH_VERSION} ${ELASTICSEARCH_HOME} \
    && adduser -D -h ${ELASTICSEARCH_HOME} elasticsearch \
    && chown -R elasticsearch:elasticsearch ${ELASTICSEARCH_HOME}

# Switch to the elasticsearch user
USER elasticsearch

# Expose Elasticsearch ports
EXPOSE 9200 9300

# Set the working directory to Elasticsearch home
WORKDIR ${ELASTICSEARCH_HOME}

# Start Elasticsearch
CMD ["bin/elasticsearch", "-E", "network.host=0.0.0.0"]