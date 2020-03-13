#include <stdio.h>
#include <windows.h>

int main()
{
	int a;

	while (1)
	{

		a = GetKeyState(VK_MENU); //获取某键状态

		if (a < 0) //如果某键被按下
		{
			printf("alt键按下");
		}
	}
	return 0;
}