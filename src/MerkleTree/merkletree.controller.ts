import { Controller } from "@nestjs/common";
import { MerkleTreeService } from "./merkletree.service";

@Controller('merkletree')
export class  MerkleTreeController {
  constructor(private readonly apiService: MerkleTreeService){ }
}