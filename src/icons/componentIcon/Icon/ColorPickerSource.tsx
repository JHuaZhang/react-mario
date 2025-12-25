export const ColorPickerSource = (
  <svg viewBox="0 0 1424 1024">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      {/* 主要滴管形状 */}
      <path
        d="M630.5,162.5 C636.022848,162.5 640.5,166.977152 640.5,172.5 C640.5,177.92924 636.17333,182.347932 630.779905,182.496158 L630.5,182.5 L343.3,182.5 C337.87076,182.5 333.452068,186.82667 333.303842,192.220095 L333.3,192.5 L333.3,479.7 C333.3,485.222848 328.822848,489.7 323.3,489.7 C317.87076,489.7 313.452068,485.37333 313.303842,479.979905 L313.3,479.7 L313.3,192.5 C313.3,176.097144 326.464172,162.768944 342.803896,162.50402 L343.3,162.5 L630.5,162.5 Z"
        fill="var(--dn-brand-color)"
        fillRule="nonzero"
        transform="translate(476.9, 326.1) rotate(135.000000) translate(-476.9, -326.1) "
      ></path>

      {/* 滴管尖端 */}
      <path
        d="M494.5,456.5 C500.022848,456.5 504.5,460.977152 504.5,466.5 C504.5,471.92924 500.17333,476.347932 494.779905,476.496158 L494.5,476.5 L207.3,476.5 C201.87076,476.5 197.452068,480.82667 197.303842,486.220095 L197.3,486.5 L197.3,773.7 C197.3,779.222848 192.822848,783.7 187.3,783.7 C181.87076,783.7 177.452068,779.37333 177.303842,773.979905 L177.3,773.7 L177.3,486.5 C177.3,470.097144 190.464172,456.768944 206.803896,456.50402 L207.3,456.5 L494.5,456.5 Z"
        fill="var(--dn-brand-color)"
        fillRule="nonzero"
        transform="translate(340.9, 620.1) rotate(-45.000000) translate(-340.9, -620.1) "
      ></path>

      {/* 颜色面板 - 多个颜色方块 */}
      <rect fill="#FF6B6B" x="750" y="300" width="80" height="80" rx="8"></rect>
      <rect fill="#4ECDC4" x="850" y="300" width="80" height="80" rx="8"></rect>
      <rect fill="#FFD166" x="950" y="300" width="80" height="80" rx="8"></rect>
      <rect fill="#06D6A0" x="750" y="400" width="80" height="80" rx="8"></rect>
      <rect fill="#118AB2" x="850" y="400" width="80" height="80" rx="8"></rect>
      <rect fill="#EF476F" x="950" y="400" width="80" height="80" rx="8"></rect>
      <rect fill="#073B4C" x="750" y="500" width="80" height="80" rx="8"></rect>
      <rect fill="#9B5DE5" x="850" y="500" width="80" height="80" rx="8"></rect>
      <rect fill="var(--dn-brand-color)" x="950" y="500" width="80" height="80" rx="8"></rect>

      {/* 当前选择的颜色指示器 */}
      <circle fill="none" stroke="#999999" strokeWidth="3" cx="670" cy="680" r="50"></circle>
      <circle fill="var(--dn-brand-color)" cx="670" cy="680" r="40"></circle>

      {/* 颜色值显示 */}
      <rect fill="#F5F5F5" x="650" y="750" width="140" height="50" rx="6"></rect>
      <text x="720" y="782" textAnchor="middle" fontFamily="Arial" fontSize="18" fill="#333333">
        #4ECDC4
      </text>

      {/* 调色板装饰元素 */}
      <path
        d="M600,350 C614.947917,350 627.708333,344.075521 638.28125,332.226562 C650.677083,318.372396 656.875,293.671875 656.875,258.125 C656.875,218.567708 651.497396,193.320312 640.742188,182.382812 C630.169271,171.627604 616.588542,166.25 600,166.25 C577.03125,166.25 561.080729,176.731771 552.148438,197.695312 C546.132812,211.549479 543.125,231.692708 543.125,258.125 C543.125,293.307292 548.320312,317.369792 558.710938,330.3125 C569.283854,343.4375 583.046875,350 600,350 Z"
        fill="#E0E0E0"
        fillRule="nonzero"
      ></path>

      {/* 滴管手柄装饰 */}
      <rect fill="#CCCCCC" x="550" y="150" width="20" height="200" rx="10"></rect>
      <circle fill="#CCCCCC" cx="560" cy="370" r="15"></circle>

      {/* 右侧颜色轮盘 */}
      <circle fill="none" stroke="#999999" strokeWidth="3" cx="1150" cy="600" r="120"></circle>
      <circle fill="url(#colorWheel)" cx="1150" cy="600" r="110"></circle>

      {/* 颜色轮盘指针 */}
      <path
        d="M1150,480 L1150,460 L1155,470 Z"
        fill="var(--dn-brand-color)"
        transform="translate(1150, 600) rotate(45.000000) translate(-1150, -600)"
      ></path>
    </g>

    {/* 定义颜色轮盘的渐变色 */}
    <defs>
      <linearGradient id="colorWheel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF0000" />
        <stop offset="17%" stopColor="#FFFF00" />
        <stop offset="33%" stopColor="#00FF00" />
        <stop offset="50%" stopColor="#00FFFF" />
        <stop offset="67%" stopColor="#0000FF" />
        <stop offset="83%" stopColor="#FF00FF" />
        <stop offset="100%" stopColor="#FF0000" />
      </linearGradient>
    </defs>
  </svg>
);
