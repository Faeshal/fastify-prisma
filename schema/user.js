"use strict";

const getUser = {
  params: {
    type: "object",
    required: ["id"],
    properties: { id: { type: "number" } },
  },
};

const createUser = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      phone: { type: "string" },
    },
    required: ["name", "email", "phone"],
  },
};

const updateUser = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      phone: { type: "string" },
    },
    required: ["name", "email"],
  },
  params: {
    type: "object",
    required: ["id"],
    properties: { id: { type: "number" } },
  },
};

const deleteUser = {
  params: {
    type: "object",
    required: ["id"],
    properties: { id: { type: "number" } },
  },
};

module.exports = { getUser, createUser, updateUser, deleteUser };
