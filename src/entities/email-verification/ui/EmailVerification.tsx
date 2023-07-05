import { Container, Title, Paper, Text, Loader, Flex } from 'shared/ui';

export type EmailVerificationProps = {
  status: EmailVerificationStatus;
};

export enum EmailVerificationStatus {
  loading,
  success,
  fail,
}

export const EmailVerification = ({ status }: EmailVerificationProps) => {
  const getContent = () => {
    switch (status) {
      case EmailVerificationStatus.loading:
        return (
          <Flex direction="column" align="center">
            <Loader />
            <Text>Loading</Text>
          </Flex>
        );
    }
  };

  return (
    <Container size={500}>
      <Title align="center" sx={{ fontWeight: 900 }}>
        Email verification
      </Title>
      <Paper>{getContent()}</Paper>
    </Container>
  );
};
