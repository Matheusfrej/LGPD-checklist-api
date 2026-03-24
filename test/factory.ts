import { InMemoryRepositoryFactory } from "./repository/InMemoryRepositoryFactory";
import { RepositoryFactory } from "../src/domain/factory/repositoryFactory";

export const testFactory: RepositoryFactory = new InMemoryRepositoryFactory();
