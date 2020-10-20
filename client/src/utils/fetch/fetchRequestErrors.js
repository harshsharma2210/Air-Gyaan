export class FetchRequestError extends Error {
  constructor(message) {
    super(message);
  }
}

export class ConfirmDialogCanceledException extends Error {
  constructor(message) {
    super(message);
  }
}

export class ServerDownError extends FetchRequestError {
  constructor(message = "Components.GlobalErrors.serverDown") {
    super(message);
  }
}

export class InvalidConfigurationError extends FetchRequestError {
  constructor(message = "Components.GlobalErrors.badConfiguration") {
    super(message);
  }
}

export class CodedFetchRequestError extends FetchRequestError {
  constructor(message, errorCode) {
    super(message);
    this.errorCode = errorCode;
  }
}

export class UnauthorizedRequestError extends CodedFetchRequestError {
  constructor(message = "Components.GlobalErrors.error401") {
    super(message, 401);
  }
}

export class ForbiddenRequestError extends CodedFetchRequestError {
  constructor(message = "Components.GlobalErrors.error403") {
    super(message, 403);
  }
}

export class NotFoundRequestError extends CodedFetchRequestError {
  constructor(message = "Components.GlobalErrors.error404") {
    super(message, 404);
  }
}

export class GoneRequestError extends CodedFetchRequestError {
  constructor(message = "Components.GlobalErrors.error410") {
    super(message, 410);
  }
}

export class InternalServerRequestError extends CodedFetchRequestError {
  constructor(message = "Components.GlobalErrors.error500") {
    super(message, 500);
  }
}

export class ModulePageError extends FetchRequestError {
  constructor(message, to = null) {
    super(message);
    this.to = to;
  }
}

export class FatalStatePageError extends ModulePageError {
  constructor(message, to = null) {
    super(message, to);
  }
}

export class TargetNotFoundError extends ModulePageError {
  constructor(message, to) {
    super(message, to);
  }
}

