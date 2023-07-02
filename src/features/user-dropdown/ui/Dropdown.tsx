export type DropdownProps = {
  firstName: string;
  lastName: string;
  email: string;
};

export const Dropdown = ({ firstName, lastName, email }: DropdownProps) => (
  <div>
    {firstName} {lastName} – {email}
  </div>
);
