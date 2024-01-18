import '@testing-library/jest-dom';

import { render, screen, act, within } from '@/__tests__/test-utils';

import { Layout } from '@/components/layout';
import { sidebarList } from '@/utils/constants';
import { useAuthStore } from '@/utils/states';

describe('Sidebar Component', () => {
  it('should render the page and show sidebar list for superadmin', async () => {
    const role = 'superadmin';
    useAuthStore.setState({ role: role }, true);

    await act(async () => {
      render(
        <Layout variant="admin">
          <p>Test</p>
        </Layout>
      );
    });

    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).toBeInTheDocument();

    for (const sidebarItem of sidebarList[role]) {
      const sidebarHeading = within(sidebar).getByTestId(
        `sidebar-${sidebarItem.heading}`
      );

      expect(sidebarHeading).toBeInTheDocument();

      if (sidebarItem.child) {
        expect(
          within(sidebarHeading).getAllByTestId('sidebar-child')
        ).toHaveLength(sidebarItem.child.length);
      }
    }
  });

  it('should render the page and show sidebar list for admin', async () => {
    const role = 'admin';
    useAuthStore.setState({ role: role }, true);

    await act(async () => {
      render(
        <Layout variant="admin">
          <p>Test</p>
        </Layout>
      );
    });

    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).toBeInTheDocument();

    for (const sidebarItem of sidebarList[role]) {
      const sidebarHeading = within(sidebar).getByTestId(
        `sidebar-${sidebarItem.heading}`
      );

      expect(sidebarHeading).toBeInTheDocument();

      if (sidebarItem.child) {
        expect(
          within(sidebarHeading).getAllByTestId('sidebar-child')
        ).toHaveLength(sidebarItem.child.length);
      }
    }
  });

  it('should render the page and show sidebar list for suster', async () => {
    const role = 'suster';
    useAuthStore.setState({ role: role }, true);

    await act(async () => {
      render(
        <Layout variant="admin">
          <p>Test</p>
        </Layout>
      );
    });

    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).toBeInTheDocument();

    for (const sidebarItem of sidebarList[role]) {
      const sidebarHeading = within(sidebar).getByTestId(
        `sidebar-${sidebarItem.heading}`
      );

      expect(sidebarHeading).toBeInTheDocument();

      if (sidebarItem.child) {
        expect(
          within(sidebarHeading).getAllByTestId('sidebar-child')
        ).toHaveLength(sidebarItem.child.length);
      }
    }
  });

  it('should render the page and show sidebar list for dokter', async () => {
    const role = 'dokter';
    useAuthStore.setState({ role: role }, true);

    await act(async () => {
      render(
        <Layout variant="admin">
          <p>Test</p>
        </Layout>
      );
    });

    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).toBeInTheDocument();

    for (const sidebarItem of sidebarList[role]) {
      const sidebarHeading = within(sidebar).getByTestId(
        `sidebar-${sidebarItem.heading}`
      );

      expect(sidebarHeading).toBeInTheDocument();

      if (sidebarItem.child) {
        expect(
          within(sidebarHeading).getAllByTestId('sidebar-child')
        ).toHaveLength(sidebarItem.child.length);
      }
    }
  });
});
