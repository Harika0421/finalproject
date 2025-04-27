import { User } from '../../types';
import { getInitials } from '../../lib/utils';

interface CollaboratorAvatarsProps {
  users: User[];
  maxDisplay?: number;
}

export default function CollaboratorAvatars({ users, maxDisplay = 3 }: CollaboratorAvatarsProps) {
  const displayUsers = users.slice(0, maxDisplay);
  const remaining = users.length - maxDisplay;
  
  return (
    <div className="flex -space-x-2 overflow-hidden">
      {displayUsers.map((user) => (
        <div
          key={user.id}
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          style={{ backgroundColor: user.color }}
          title={user.name}
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-white font-medium text-sm">
              {getInitials(user.name)}
            </div>
          )}
        </div>
      ))}
      
      {remaining > 0 && (
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 ring-2 ring-white">
          <span className="text-xs font-medium text-gray-600">+{remaining}</span>
        </div>
      )}
    </div>
  );
}