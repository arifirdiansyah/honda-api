export function initRulePermission(permissionName) {
  return [
    {
      name: `Can Read ${permissionName}`,
      title: 'Read',
      ruleSelector: 'can_read',
    },
    {
      name: `Can Update ${permissionName}`,
      title: 'Update',
      ruleSelector: 'can_update',
    },
    {
      name: `Can Delete ${permissionName}`,
      title: 'Delete',
      ruleSelector: 'can_delete',
    },
  ];
}
