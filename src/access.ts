import { userInfo } from './entities/user';

/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: { user: userInfo } } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser?.user && currentUser.user.role.resources === null,
  };
}
