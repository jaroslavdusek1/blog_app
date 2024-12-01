import {
  Body,
  Controller,
  Param,
  Post,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { VotesService } from './votes.service';

/**
 * VotesController
 *
 * Handles voting on comments (upvote/downvote).
 */
@ApiTags('Votes') // Swagger grouping
@Controller('comments/:id/vote')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  /**
   * Cast a vote on a comment.
   *
   * @param {number} commentId - The ID of the comment being voted on.
   * @param {string} voteType - The type of vote ("upvote" or "downvote").
   * @param {string} ipAddress - The voter's IP address.
   * @returns {Promise<Object>} - The result of the vote operation.
   * @throws {BadRequestException} - If validation fails.
   */
  @ApiOperation({ summary: 'Vote on a comment (upvote or downvote)' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the comment to vote on',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        voteType: {
          type: 'string',
          description: 'Type of vote (upvote or downvote)',
          example: 'upvote',
        },
        ipAddress: {
          type: 'string',
          description: 'IP address of the voter',
          example: '192.168.0.1',
        },
      },
      required: ['voteType', 'ipAddress'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Vote successfully recorded.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error or invalid input.',
  })
  @Post()
  async vote(
    @Param('id') commentId: number,
    @Body('voteType') voteType: string,
    @Body('ipAddress') ipAddress: string,
  ) {
    // Validate commentId
    if (!commentId || isNaN(commentId)) {
      throw new BadRequestException('Invalid comment ID.');
    }

    // Validate voteType
    if (!voteType || !['upvote', 'downvote'].includes(voteType.toLowerCase())) {
      throw new BadRequestException(
        'Invalid vote type. Must be "upvote" or "downvote".',
      );
    }

    // Validate ipAddress
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
    if (!ipAddress || !ipRegex.test(ipAddress)) {
      throw new BadRequestException('Invalid IP address.');
    }

    return this.votesService.vote(commentId, voteType, ipAddress);
  }
}
