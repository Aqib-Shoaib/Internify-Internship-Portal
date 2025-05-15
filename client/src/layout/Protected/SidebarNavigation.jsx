/* eslint-disable react/prop-types */

function SidebarNavigation({ navItems, selectedTab, setSelectedTab }) {
  return (
    <aside className='flex flex-col gap-2'>
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => setSelectedTab(item.name)}
          className={`flex items-center gap-2 px-4 py-2 text-secondary-foreground rounded-md hover:bg-secondary ${
            selectedTab === item.name && "bg-secondary "
          }`}
        >
          {item.icon}
          {item.name}
        </button>
      ))}
    </aside>
  );
}

export default SidebarNavigation;
