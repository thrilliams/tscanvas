import { RequestHandler } from './RequestHandler';
import { Assignment, AssignmentGetOptions, AssignmentGetSingleOptions } from './types/Assignments';

export class Canvas {
    private handler: RequestHandler;

    constructor(token: string, endpoint = 'https://canvas.instructure.com/api/v1/') {
        this.handler = new RequestHandler(token, endpoint);
    }

    async getAssignments(course_id: number, options?: AssignmentGetOptions): Promise<Assignment[]> {
        let json = await this.handler.paginate(await this.handler.get(
            `courses/${course_id}/assignments`,
            AssignmentGetOptions.parse(options),
            true,
            false
        ));
        let assignments = Assignment.array().parse(json);
        return assignments;
    }

    async getAssignmentsByGroup(course_id: number, assignment_group_id: number, options?: AssignmentGetOptions): Promise<Assignment[]> {
        let json = await this.handler.paginate(await this.handler.get(
            `courses/${course_id}/assignment_groups/${assignment_group_id}/assignments`,
            AssignmentGetOptions.parse(options),
            true,
            false
        ));
        let assignments = Assignment.array().parse(json);
        return assignments;
    }

    async getAssignmentsByUser(user_id: number, course_id: number, options?: AssignmentGetOptions): Promise<Assignment[]> {
        let json = await this.handler.paginate(await this.handler.get(
            `users/${user_id}/courses/${course_id}/assignments`,
            AssignmentGetOptions.parse(options),
            true,
            false
        ));
        let assignments = Assignment.array().parse(json);
        return assignments;
    }

    async getAssignment(course_id: number, assignment_id: number, options?: AssignmentGetSingleOptions): Promise<Assignment> {
        let json = await this.handler.get(
            `courses/${course_id}/assignments/${assignment_id}`,
            AssignmentGetSingleOptions.parse(options)
        );
        let assignment = Assignment.parse(json);
        return assignment;
    }
}

module.exports.Canvas = Canvas;