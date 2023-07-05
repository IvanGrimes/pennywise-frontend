import { Container, Title, Text, Paper, Divider } from 'shared/ui';
import { ReactNode } from 'react';

export type AuthProps = {
  titleSlot: ReactNode;
  subtitleSlot: ReactNode;
  socialSlot?: ReactNode;
  formSlot: ReactNode;
};

export const Auth = ({
  titleSlot,
  subtitleSlot,
  socialSlot,
  formSlot,
}: AuthProps) => (
  <Container size={500}>
    <Title align="center" sx={{ fontWeight: 900 }}>
      {titleSlot}
    </Title>
    <Text color="dimmed" size="sm" align="center" mt={5}>
      {subtitleSlot}
    </Text>
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      {socialSlot && (
        <>
          {socialSlot}
          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />
        </>
      )}
      {formSlot}
    </Paper>
  </Container>
);
