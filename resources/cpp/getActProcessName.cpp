#include <windows.h>
#include <iostream>

using namespace std;
DWORD GetActWindowPid()
{
    HWND hwnd = GetForegroundWindow();
    DWORD processId = 0;
    GetWindowThreadProcessId(hwnd, &processId);
    return processId;
}

int main()
{   
    cout << GetActWindowPid() << endl;
    return 0;
}
