export const superAdmin = async (req, res, next) => {
  try {
    const role = await checkRoleHasAccess(req.user, 'SUPER_ADMIN');
    if (role) {
      return next();
    }
    return res.status(403).sendError('Access denied. user has no permission access');
  } catch (e) {
    return res.status(403).sendError('Access denied. user has no permission access');
  }
};

export const admin = async (req, res, next) => {
  try {
    const role = await checkRoleHasAccess(req.user, 'ADMIN');
    if (role) {
      return next();
    }
    return res.status(403).sendError('Access denied. user has no permission access');
  } catch (e) {
    return res.status(403).sendError('Access denied. user has no permission access');
  }
};

export const customer = async (req, res, next) => {
  try {
    const role = await checkRoleHasAccess(req.user, 'CUSTOMER');
    if (role) {
      return next();
    }
    return res.status(403).sendError('Access denied. user has no permission access');
  } catch (e) {
    return res.status(403).sendError('Access denied. user has no permission access');
  }
};

async function checkRoleHasAccess(user, permissionRequired) {
  try {
    const role = user.role;

    switch (role) {
      case 'SUPER_ADMIN':
        return true;
        case 'ADMIN':
          return ['ADMIN', 'SUPER_ADMIN'].includes(permissionRequired);
          case 'CUSTOMER':
            return ['CUSTOMER'].includes(permissionRequired);
      default:
        return false;
    }
  } catch (e) {
    return false;
  }
}
