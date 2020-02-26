// package: cloudstate.samples.chat.friends
// file: friends.proto

import * as jspb from "google-protobuf";
import * as cloudstate_entity_key_pb from "./cloudstate/entity_key_pb";

export class Friend extends jspb.Message {
  getUser(): string;
  setUser(value: string): void;

  getAvatar(): string;
  setAvatar(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Friend.AsObject;
  static toObject(includeInstance: boolean, msg: Friend): Friend.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Friend, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Friend;
  static deserializeBinaryFromReader(message: Friend, reader: jspb.BinaryReader): Friend;
}

export namespace Friend {
  export type AsObject = {
    user: string,
    avatar: string,
  }
}

export class FriendRequest extends jspb.Message {
  getUser(): string;
  setUser(value: string): void;

  hasFriend(): boolean;
  clearFriend(): void;
  getFriend(): Friend | undefined;
  setFriend(value?: Friend): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FriendRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FriendRequest): FriendRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FriendRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FriendRequest;
  static deserializeBinaryFromReader(message: FriendRequest, reader: jspb.BinaryReader): FriendRequest;
}

export namespace FriendRequest {
  export type AsObject = {
    user: string,
    friend?: Friend.AsObject,
  }
}

export class User extends jspb.Message {
  getUser(): string;
  setUser(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    user: string,
  }
}

export class FriendsList extends jspb.Message {
  clearFriendsList(): void;
  getFriendsList(): Array<Friend>;
  setFriendsList(value: Array<Friend>): void;
  addFriends(value?: Friend, index?: number): Friend;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FriendsList.AsObject;
  static toObject(includeInstance: boolean, msg: FriendsList): FriendsList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FriendsList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FriendsList;
  static deserializeBinaryFromReader(message: FriendsList, reader: jspb.BinaryReader): FriendsList;
}

export namespace FriendsList {
  export type AsObject = {
    friendsList: Array<Friend.AsObject>,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

