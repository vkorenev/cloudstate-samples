#!/bin/bash
set -x 
mkdir -p ./src/_proto/cloudstate
mkdir -p ./src/_proto/google/api

echo "Compiling protobuf definitions"

OUT_DIR="./src/_proto"
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"


echo "Compile cloudstate entity key"
protoc \
    --proto_path="node_modules/cloudstate/proto/google/api/" \
    --proto-path="node_modules/cloudstate/protoc/include/google/protobuf/" \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}/google/api" \
    --ts_out="service=grpc-web:${OUT_DIR}/google/api" \
    httpbody.proto

protoc \
    --proto_path="node_modules/cloudstate/proto/google/api/" \
    --proto-path="node_modules/cloudstate/protoc/include/google/protobuf/" \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}/google/api" \
    --ts_out="service=grpc-web:${OUT_DIR}/google/api" \
    http.proto

protoc \
    --proto_path="node_modules/cloudstate/proto/google/api/" \
    --proto-path="node_modules/cloudstate/protoc/include/google/protobuf/" \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}/google/api" \
    --ts_out="service=grpc-web:${OUT_DIR}/google/api" \
    -I ../cloudstate/protocols/frontend/ \
    annotations.proto

protoc \
    --proto_path="node_modules/cloudstate/proto/cloudstate/" \
    --proto-path="node_modules/cloudstate/protoc/include/google/protobuf/" \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}/cloudstate" \
    --ts_out="service=grpc-web:${OUT_DIR}/cloudstate" \
    entity_key.proto 

echo "Compiling Chat Service"
protoc \
  -I node_modules/cloudstate/proto/google/api/ \
  -I node_modules/cloudstate/proto/cloudstate/ \
  --include_imports \
  --proto_path=node_modules/cloudstate/proto \
  --proto_path=node_modules/cloudstate/protoc/include \
  --descriptor_set_out=user-function.desc \
  --proto_path=. \
  chat.proto

echo "Compile Friends Service"
protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="service=grpc-web:${OUT_DIR}" \
    --proto_path="../friends" \
    -I node_modules/cloudstate/proto/google/api/ \
    -I node_modules/cloudstate/proto/ \
     friends.proto

echo "Compile Presence Service"
protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="service=grpc-web:${OUT_DIR}" \
    --proto_path="../presence" \
    -I node_modules/cloudstate/proto/google/api/ \
    -I node_modules/cloudstate/proto/ \
     presence.proto
