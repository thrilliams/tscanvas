import { z } from 'zod';

const ExternalToolTagAttributes = z.object({
    url: z.string().url(),
    new_tab: z.boolean(),
    resource_link_id: z.string(),

    // not in api docs
    external_data: z.string().nullable(),
    content_type: z.string(),
    content_id: z.string(),
    custom_params: z.null()
}).strict();

const CompletionRequirements = z.object({
    id: z.string(),
    type: z.string()
}).strict();

const ContextModule = z.object({
    id: z.string(),
    context_id: z.string(),
    context_type: z.string(),
    name: z.string(),
    position: z.number(),
    prerequisites: z.string().array(),
    completion_requirements: CompletionRequirements.array(),
    created_at: z.string().transform(date => new Date(date)),
    updated_at: z.string().transform(date => new Date(date)),
    workflow_state: z.string(),
    deleted_at: z.string().transform(date => new Date(date)).nullable(),
    unlock_at: z.string().transform(date => new Date(date)).nullable(),
    migration_id: z.string(),
    require_sequential_progress: z.boolean(),
    cloned_item_id: z.string().nullable(),
    completion_events: z.null(),
    requirement_count: z.number().int().nullable(),
    root_account_id: z.string()
}).strict();

const LockInfo = z.object({
    asset_string: z.string(),
    unlock_at: z.string().transform(date => new Date(date)).optional(),
    lock_at: z.string().transform(date => new Date(date)).optional(),
    context_module: ContextModule.optional(),
    manually_locked: z.boolean().optional()
}).strict();

const RubricRating = z.object({
    points: z.number(),
    id: z.string(),
    description: z.string(),
    long_description: z.string()
}).strict();

const RubricCriteria = z.object({
    points: z.number().int(),
    id: z.string(),
    learning_outcome_id: z.string().optional(),
    vendor_guid: z.string().nullable().optional(),
    description: z.string(),
    long_description: z.string().nullable(),
    criterion_use_range: z.boolean(),
    ratings: RubricRating.array(),
    ignore_for_scoring: z.boolean().nullable(),

    // not in api docs
    outcome_id: z.string().optional()
}).strict();

// not in api docs
const RubricSettings = z.object({
    title: z.string(),
    points_possible: z.number(),
    free_form_criterion_comments: z.boolean(),
    hide_score_total: z.boolean(),
    hide_points: z.boolean()
});

const AssignmentDate = z.object({
    id: z.string().optional(),
    base: z.boolean().optional(),
    title: z.string(),
    due_at: z.string().transform(date => new Date(date)),
    unlock_at: z.string().transform(date => new Date(date)),
    lock_at: z.string().transform(date => new Date(date))
}).strict();

const TurnitinSettings = z.object({
    originality_report_visibility: z.string(),
    s_paper_check: z.boolean(),
    internet_check: z.boolean(),
    journal_check: z.boolean(),
    exclude_biblio: z.boolean(),
    exclude_quoted: z.boolean(),
    exclude_small_matches_type: z.string(),
    exclude_small_matches_value: z.number().int()
}).strict();

const NeedsGradingCount = z.object({
    section_id: z.string(),
    needs_grading_count: z.number().int()
}).strict();

const ScoreStatistic = z.object({
    min: z.number().int(),
    max: z.number().int(),
    mean: z.number().int()
}).strict();

export const Assignment = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    created_at: z.string().transform(date => new Date(date)),
    updated_at: z.string().transform(date => new Date(date)),
    due_at: z.string().transform(date => new Date(date)).nullable(),
    lock_at: z.string().transform(date => new Date(date)).nullable(),
    unlock_at: z.string().transform(date => new Date(date)).nullable(),
    has_overrides: z.boolean().optional(),
    all_dates: z.null().optional(),
    course_id: z.string(),
    html_url: z.string().url(),
    submissions_download_url: z.string().url(),
    assignment_group_id: z.string(),
    due_date_required: z.boolean(),
    allowed_extensions: z.string().array().optional(),
    max_name_length: z.number().int().positive(),
    turnitin_enabled: z.boolean().optional(),
    vericite_enabled: z.boolean().optional(),
    turnitin_settings: TurnitinSettings.optional(),
    grade_group_students_individually: z.boolean(),
    external_tool_tag_attributes: ExternalToolTagAttributes.optional(),
    peer_reviews: z.boolean(),
    automatic_peer_reviews: z.boolean(),
    peer_review_count: z.number().int().optional(),
    peer_reviews_assign_at: z.string().transform(date => new Date(date)).optional(),
    intra_group_peer_reviews: z.boolean(),
    group_category_id: z.string().nullable(),
    needs_grading_count: z.number().int().optional(),
    needs_grading_count_by_section: NeedsGradingCount.array().optional(),
    position: z.number().int(),
    post_to_sis: z.boolean().optional(),
    integration_id: z.string().optional(),
    integration_data: z.null().optional(),
    points_possible: z.number().nonnegative(),
    submission_types: z.union([
        z.literal('discussion_topic'),
        z.literal('online_quiz'),
        z.literal('on_paper'),
        z.literal('none'),
        z.literal('external_tool'),
        z.literal('online_text_entry'),
        z.literal('online_url'),
        z.literal('online_upload'),
        z.literal('media_recording'),
        z.literal('student_annotation')
    ]).array(),
    has_submitted_submissions: z.boolean(),
    grading_type: z.union([
        z.literal('pass_fail'),
        z.literal('percent'),
        z.literal('letter_grade'),
        z.literal('gpa_scale'),
        z.literal('points')
    ]),
    grading_standard_id: z.string().nullable(),
    published: z.boolean(),
    unpublishable: z.boolean().optional(),
    only_visible_to_overrides: z.boolean(),
    locked_for_user: z.boolean(),
    lock_info: LockInfo.optional(),
    lock_explanation: z.string().optional(),
    quiz_id: z.string().optional(),
    anonymous_submissions: z.boolean().optional(),
    discussion_topic: z.null().optional(),
    freeze_on_copy: z.boolean().optional(),
    frozen: z.boolean().optional(),
    frozen_attributes: z.union([
        z.literal('title'),
        z.literal('description'),
        z.literal('lock_at'),
        z.literal('points_possible'),
        z.literal('grading_type'),
        z.literal('submission_types'),
        z.literal('assignment_group_id'),
        z.literal('allowed_extensions'),
        z.literal('group_category_id'),
        z.literal('notify_of_update'),
        z.literal('peer_reviews')
    ]).array().optional(),
    submission: z.null().optional(),
    use_rubric_for_grading: z.boolean().optional(),
    rubric_settings: RubricSettings.optional(),
    rubric: RubricCriteria.array().optional(),
    assignment_visibility: z.string().array().optional(),
    overrides: z.null().optional(),
    omit_from_final_grade: z.boolean().optional(),
    moderated_grading: z.boolean(),
    grader_count: z.number().int(),
    final_grader_id: z.string().nullable(),
    grader_comments_visible_to_graders: z.boolean(),
    graders_anonymous_to_graders: z.boolean(),
    grader_names_visible_to_final_grader: z.boolean(),
    anonymous_grading: z.boolean(),
    allowed_attempts: z.number().int(),
    post_manually: z.boolean(),
    score_statistics: ScoreStatistic.array().optional(),
    can_submit: z.boolean().optional(),

    // not in api docs
    anonymous_peer_reviews: z.boolean(),
    anonymous_instructor_annotations: z.boolean(),
    secure_params: z.string(),
    in_closed_grading_period: z.boolean(),
    is_quiz_assignment: z.boolean(),
    can_duplicate: z.boolean(),
    original_course_id: z.null(),
    original_assignment_id: z.null(),
    original_assignment_name: z.null(),
    original_quiz_id: z.null(),
    workflow_state: z.string(),
    important_dates: z.boolean(),
    muted: z.boolean(),
    anonymize_students: z.boolean(),
    require_lockdown_browser: z.boolean(),
    url: z.string().url().optional(),
    free_form_criterion_comments: z.boolean().optional()
}).strict();

export type Assignment = z.infer<typeof Assignment>;

export const AssignmentOverride = z.object({
    id: z.string(),
    assignment_id: z.string(),
    student_ids: z.string().array().optional(),
    group_id: z.string().optional(),
    course_section_id: z.string().optional(),
    title: z.string(),
    due_at: z.string().transform(date => new Date(date)).optional(),
    all_day: z.boolean().optional(),
    all_day_date: z.string().transform(date => new Date(date)).optional(),
    unlock_at: z.string().transform(date => new Date(date)).optional(),
    lock_at: z.string().transform(date => new Date(date)).optional()
}).strict();

export type AssignmentOverride = z.infer<typeof AssignmentOverride>;

export const AssignmentGetOptions = z.object({
    include: z.union([
        z.literal('submission'),
        z.literal('assignment_visibility'),
        z.literal('all_dates'),
        z.literal('overrides'),
        z.literal('observed_users'),
        z.literal('can_edit'),
        z.literal('score_statistics')
    ]).array(),
    search_term: z.string(),
    override_assignment_dates: z.boolean(),
    needs_grading_count_by_section: z.boolean(),
    bucket: z.union([
        z.literal('past'),
        z.literal('overdue'),
        z.literal('undated'),
        z.literal('ungraded'),
        z.literal('unsubmitted'),
        z.literal('upcoming'),
        z.literal('future')
    ]),
    assignment_ids: z.string().array(),
    order_by: z.union([
        z.literal('position'),
        z.literal('name'),
        z.literal('due_at')
    ]),
    post_to_sis: z.boolean()
}).partial().strict().optional();

export type AssignmentGetOptions = z.input<typeof AssignmentGetOptions>;

export const AssignmentGetSingleOptions = z.object({
    include: z.union([
        z.literal('submission'),
        z.literal('assignment_visibility'),
        z.literal('all_dates'),
        z.literal('overrides'),
        z.literal('observed_users'),
        z.literal('can_edit'),
        z.literal('score_statistics')
    ]).array(),
    override_assignment_dates: z.boolean(),
    needs_grading_count_by_section: z.boolean(),
    all_dates: z.boolean()
}).partial().strict().optional();

export type AssignmentGetSingleOptions = z.input<typeof AssignmentGetSingleOptions>;