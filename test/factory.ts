import { InMemoryRepositoryFactory } from "../src/domain/factory/InMemoryRepositoryFactory";
import { RepositoryFactory } from "../src/domain/factory/repositoryFactory";

export const testFactory: RepositoryFactory = new InMemoryRepositoryFactory();
