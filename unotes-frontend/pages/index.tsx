import {
  AppShell,
  Button,
  Container,
  Header,
  Navbar,
  Space,
  Text,
} from '@mantine/core';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <AppShell
        padding="md"
        header={
          <Header
            height={60}
            p="xs"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            fixed
          >
            <Text>
              <b>U-Notes</b>
            </Text>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button variant="outline" size="xs">
                Login
              </Button>
              <Space w="md" />
              <Button variant="outline" size="xs">
                Daftar
              </Button>
            </div>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
            height: '100vh',
            paddingTop: '80px',
          },
        })}
      >
        <Container
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text align="center" size="lg">
            <h2>"Making Notes Never Been This Easier"</h2>
          </Text>
          <Text align="center">
            U-Notes enables U to have your own simple notes that you can use
            later
          </Text>
          <Text align="center">It's Completely Free</Text>
        </Container>
      </AppShell>
    </>
  );
};

export default Home;
