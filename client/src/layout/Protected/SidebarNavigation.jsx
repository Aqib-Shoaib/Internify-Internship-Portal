/* eslint-disable react/prop-types */

function SidebarNavigation({ navItems, selectedTab, setSelectedTab }) {
  return (
    <aside
      className='flex flex-row md:flex-col items-center md:items-start justify-center md:justify-start gap-2'
      data-aos='fade-right'
    >
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => setSelectedTab(item.name)}
          className={`flex items-center gap-2 px-4 py-2 text-secondary-foreground whitespace-nowrap rounded-md hover:bg-secondary ${
            selectedTab === item.name && "bg-secondary "
          }`}
        >
          <span>{item.icon}</span>
          <span className='hidden md:block'>{item.label}</span>
        </button>
      ))}
    </aside>
  );
}

export default SidebarNavigation;
