#!/bin/bash

mkdir -p ./src/_proto/cloudstate

echo "Compiling protobuf definitions"

OUT_DIR="./src/_proto"
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"


echo "Compile cloudstate entity key"
protoc \
    --proto_path="../cloudstate/protocols/frontend/google/api/" \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}/google/api" \
    --ts_out="service=grpc-web:${OUT_DIR}/google/api" \
    httpbody.proto

protoc \
    --proto_path="../cloudstate/protocols/frontend/google/api/" \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}/google/api" \
    --ts_out="service=grpc-web:${OUT_DIR}/google/api" \
    http.proto

protoc \
    --proto_path="../cloudstate/protocols/frontend/google/api/" \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}/google/api" \
    --ts_out="service=grpc-web:${OUT_DIR}/google/api" \
    -I /Users/coreyauger/projects/cloudstate/protocols/frontend/ \
    annotations.proto

protoc \
    --proto_path="../cloudstate/protocols/frontend/cloudstate/" \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}/cloudstate" \
    --ts_out="service=grpc-web:${OUT_DIR}/cloudstate" \
    entity_key.proto 

echo "Compile Friends Service"
protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="service=grpc-web:${OUT_DIR}" \
    --proto_path="../friends" \
    -I ../cloudstate/protocols/frontend/google/api/ \
    -I ../cloudstate/protocols/frontend/ \
     friends.proto

echo "Compile Presence Service"
protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="service=grpc-web:${OUT_DIR}" \
    --proto_path="../presence" \
    -I ../cloudstate/protocols/frontend/google/api/ \
    -I ../cloudstate/protocols/frontend/ \
     presence.proto
