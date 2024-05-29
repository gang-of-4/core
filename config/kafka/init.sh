#!/bin/bash

kafka-topics.sh --create --topic order.created --bootstrap-server kafka:9092 --partitions 1 --replication-factor 1 || true