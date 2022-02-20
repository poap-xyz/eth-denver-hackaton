import { EntityRepository, Repository } from "typeorm";
import { Reaction } from "./entities/reaction.entity";

@EntityRepository(Reaction)
export class ReactionRepository extends Repository<Reaction> { }
