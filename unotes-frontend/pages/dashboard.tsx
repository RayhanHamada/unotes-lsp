import {
  AppShell,
  Button,
  Container,
  Header,
  List,
  Space,
  Text,
} from '@mantine/core';
import type { NextPage } from 'next';

const mock = [
  {
    id: 1,
    name: 'Catatan Kemarin',
  },
  {
    id: 2,
    name: 'Tugas minggu lalu',
  },
  {
    id: 3,
    name: 'TODO list',
  },
  {
    id: 4,
    name: 'List Google',
  },
];

const Dashboard: NextPage = (props) => {
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
              <b>U-Notes | Dashboard</b>
            </Text>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button variant="outline" size="xs">
                Logout
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
        <Container px="xs">
          <Container
            px="0"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text>
              <h2>
                <b>Catatan Rayhan</b>
              </h2>
            </Text>
            <Button variant="outline" size="xs">
              Tambah Catatan
            </Button>
          </Container>
          <Container p="0">
            <List>
              {mock.map((v) => (
                <>
                  <div
                    key={v.id}
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: 'rgba(218,218,218,0.09)',
                      padding: '1em',
                      borderRadius: '10px',
                    }}
                  >
                    <Text
                      style={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      {v.name}
                    </Text>
                    <Button variant="subtle">Hapus</Button>
                  </div>
                  <Space h="md" />
                </>
              ))}
            </List>
          </Container>
        </Container>
      </AppShell>
    </>
  );
};

export default Dashboard;
