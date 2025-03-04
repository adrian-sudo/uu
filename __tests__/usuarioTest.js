require("dotenv").config();
const { createMocks } = require("node-mocks-http");
const { GET, POST, PUT, DELETE } = require("../app/api/usuario/route");

describe("API /usuario", () => {
  it("GET /usuario - debería devolver todos los usuarios", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await GET(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toBeInstanceOf(Array);
  });

  it("POST /usuario - debería crear un nuevo usuario", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        nombre: "Juan",
        apellido: "Pérez",
        cargo: "Gerente",
        ciudad: "Madrid",
        negocio: "Tecnología",
        telefono: "123456789",
      },
    });

    await POST(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toEqual({ message: "Usuario creado" });
  });

  it("PUT /usuario - debería actualizar un usuario existente", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      body: {
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        cargo: "Director",
        ciudad: "Barcelona",
        negocio: "Tecnología",
        telefono: "987654321",
      },
    });

    await PUT(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: "Usuario actualizado" });
  });

  it("DELETE /usuario - debería eliminar un usuario", async () => {
    const { req, res } = createMocks({
      method: "DELETE",
      body: { id: 1 },
    });

    await DELETE(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: "Usuario eliminado" });
  });

  it("Método no permitido - debería devolver 405", async () => {
    const { req, res } = createMocks({
      method: "PATCH",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getJSONData()).toEqual({ message: "Método no permitido" });
  });
});
