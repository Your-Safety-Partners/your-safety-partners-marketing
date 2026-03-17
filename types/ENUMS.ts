// types/ENUMS.ts
export enum ROLES {
  SUPERADMIN = 'superadmin', // used in verifyPermissions
  ADMIN = 'admin',
  SUPER_ADMIN = 'Admin',
  COMPANY_ADMIN = 'Company Admin',
  SITE_ADMIN = 'Site Admin',
  SITE_USER = 'Staff User',
  GUEST = 'Guest',
}

export enum APPS {
  PORTAL = 'Portal',
  TRAINING = 'Training',
  POLICIES_AND_PROCEDURES = 'Policies and Procedures',
  INSPECTIONS = 'Inspections',
  CONTRACTORS = 'Contractors',
  HAZARDS = 'Hazards',
  FORMS = 'Forms',
}

export enum CompanyQueryTypes {
  ALL = 'all',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

export enum EmailVariableType {
  USER_FIELD = 'user_field',
  COMPANY_FIELD = 'company_field',
  BRANDING_FIELD = 'branding_field',
  SITE_FIELD = 'site_field',
  USER_INPUT = 'user_input',
  RUNTIME_VARIABLE = 'runtime_variable',
}

export enum EmailTemplateType {
  COMPANY_ADMIN_INVITATION = 'company-admin-invite.tsx',
  COMPANY_ADMIN_CREATED = 'company-admin-created.tsx',
  SITE_ADMIN_CREATED = 'site-admin-created.tsx',
  STAFF_USER_CREATED = 'staff-user-created.tsx',
  PASSWORD_CHANGED = 'password-changed.tsx',
  COMPANY_ADMIN_REMOVAL = 'company-admin-removed.tsx',
  CONTACT_ADMIN = 'contact-admin.tsx',
  PASSWORD_RESET_CODE_EMAIL = 'password-reset-code-email.tsx',
  FORM_LINK_SENT = 'form-link-sent.tsx',
  FORM_SUBMITTED_WITH_ACTIONS = 'form-submitted-with-actions.tsx',
  MISSED_SCHEDULED_INSPECTION = 'missed-scheduled-inspection.tsx',
  SCHEDULED_INSPECTION_ASSIGNED = 'scheduled-inspection-assigned.tsx',
  SCHEDULED_INSPECTION_CANCELLED = 'scheduled-inspection-cancelled.tsx',
  SCHEDULED_INSPECTION_REMOVED = 'scheduled-inspection-removed.tsx',
  SCHEDULED_INSPECTION_SUSPENDED = 'scheduled-inspection-suspended.tsx',
  SCHEDULED_INSPECTION_RESUMED = 'scheduled-inspection-resumed.tsx',
  SITE_ASSIGNMENT_NOTIFICATION = 'site-assignment-notification.tsx',
  ARTICLE_REVIEW_ASSIGNED = 'article-review-assigned.tsx',
  ARTICLE_REVIEW_DUE_SOON = 'article-review-due-soon.tsx',
  ARTICLE_REVIEW_EXPIRED = 'article-review-expired.tsx',
}

const ENUMS = {
  ROLES,
  CompanyQueryTypes,
  EmailVariableType,
  EmailTemplateType,
};

export default ENUMS;
