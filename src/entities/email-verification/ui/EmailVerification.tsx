import { Container, Title, Paper, Text, Loader, Flex, rem } from 'shared/ui';
import { IconCircleCheck, IconCircleX } from 'shared/icons';

export type EmailVerificationProps = {
  status: EmailVerificationStatus;
};

export enum EmailVerificationStatus {
  loading,
  success,
  fail,
}

const iconSize = rem(48);

export const EmailVerification = ({ status }: EmailVerificationProps) => {
  const getContent = () => {
    switch (status) {
      case EmailVerificationStatus.loading:
        return (
          <>
            <Loader />
            <Text mt={10}>Verifying your email now</Text>
          </>
        );
      case EmailVerificationStatus.success:
        return (
          <>
            <IconCircleCheck color="green" size={iconSize} />
            <Text mt={10}>Email has been verified.</Text>
            <Text>We&apos;ll redirect you shortly.</Text>
          </>
        );
      case EmailVerificationStatus.fail:
        return (
          <>
            <IconCircleX color="red" size={iconSize} />
            <Text mt={10}>
              Something went wrong during verifying the email.
            </Text>
            <Text>Please, resend a verification link and try again.</Text>
          </>
        );
    }
  };

  return (
    <Container size={500}>
      <Title align="center" sx={{ fontWeight: 900 }}>
        Email verification
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Flex direction="column" align="center">
          {getContent()}
        </Flex>
      </Paper>
    </Container>
  );
};
