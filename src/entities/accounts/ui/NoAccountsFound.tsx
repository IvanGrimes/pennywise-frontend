import { routes } from 'shared/routes';
import { Button, Text, Title, Link } from 'shared/ui';

export const NoAccountsFound = () => (
  <div>
    <Title sx={{ '&&': { margin: 0 } }} order={4}>
      No accounts found
    </Title>
    <Text color="dimmed">
      To add a transaction you should first create an account.
    </Text>
    <Button
      sx={{ '&&': { color: 'white', ':hover': { textDecoration: 'none' } } }}
      mt="sm"
      href={routes.accounts}
      component={Link}
    >
      Create an account
    </Button>
  </div>
);
