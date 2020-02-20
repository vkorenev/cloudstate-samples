// source: entity_key.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_descriptor_pb = require('google-protobuf/google/protobuf/descriptor_pb.js');
goog.object.extend(proto, google_protobuf_descriptor_pb);
goog.exportSymbol('proto.cloudstate.entityKey', null, global);

/**
 * A tuple of {field number, class constructor} for the extension
 * field named `entityKey`.
 * @type {!jspb.ExtensionFieldInfo<boolean>}
 */
proto.cloudstate.entityKey = new jspb.ExtensionFieldInfo(
    50002,
    {entityKey: 0},
    null,
     /** @type {?function((boolean|undefined),!jspb.Message=): !Object} */ (
         null),
    0);

google_protobuf_descriptor_pb.FieldOptions.extensionsBinary[50002] = new jspb.ExtensionFieldBinaryInfo(
    proto.cloudstate.entityKey,
    jspb.BinaryReader.prototype.readBool,
    jspb.BinaryWriter.prototype.writeBool,
    undefined,
    undefined,
    false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
google_protobuf_descriptor_pb.FieldOptions.extensions[50002] = proto.cloudstate.entityKey;

goog.object.extend(exports, proto.cloudstate);
