   M S B A M L   `   `   `  ����L  HDigital-Wellbeing, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:Digital_WellbeingDigital_Wellbeing  5   	   "    Digital_Wellbeing.MainWindow   5   	   W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5   	   R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   1localclr-namespace:Digital_Wellbeing     5   	   \ XHardcodet.Wpf.TaskbarNotification, Version=1.0.5.0, Culture=neutral, PublicKeyToken=null)tb http://www.hardcodet.net/taskbar  5   	   $��Roboto)�5        � Title$  
MainWindow��5	   	   $	��450��6   $	��800��6)   .��5
      �  � RowDefinitions 5   
   �� 5      $��10 �6   �� 5      $��45 �6   �� 5      $��* �6   .+�5   
   � $��0��6   ���#0039CB$��3��61   6G   � 5   
   $��1��6   ���#2962FF$��3��61    � ColumnDefinitions 5      �� 5      $	��200 �6#   �� 5      $��* �6#   �� 5      $��72 �6#   .+�5      �� $��0��6    �� Orientation$ 
Horizontal=�6)   $
��auto��6B   $	��Top=�6P   .+�5      �� -   5        $��0q�5      $��
10,10,10,0q�6/   
�������$��18(�6V   $��Settings��6z   ��6d   Z� 6�   5      �� 5      -   5        $��0q�5      $��1��6@   $��2��6M   $��72��6]   ��6h   Z� .��5      �� $��./Icons/logo.png��6   $��2��62   $��72��6B   $��36��6M   5      5       � 5   
   -   5          �Name$
 Main��5      $��1��6     � NavigationUIVisibility$ Hidden=�6+   $��0,45,0,0q�6K   $��2��6]   3  -Hardcodet.Wpf.TaskbarNotification.TaskbarIcon  5   
   -   5          Name$ 
notifyIcon��5      $y�visible=�6-   $��0,0,0.571,1q�6B      
IconSource$ Icons/logo.ico��6W    � ContextMenu 5       �� 5!      .@�5"      m� -   5        $
��Open��5"      6-   m� 5#      -   5        $
��Exit��5#      6-   5$      5&      5'      5(      