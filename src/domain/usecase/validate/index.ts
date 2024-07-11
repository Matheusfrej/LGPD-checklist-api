interface ValidateInterface {
  validate(req: unknown): Promise<string | null>;
}

export { ValidateInterface };
