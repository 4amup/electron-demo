#include <windows.h>
#include <iostream>
#include <Psapi.h>
#pragma comment(lib, "Psapi.lib")

using namespace std;
void GetActWindowPid()
{
    HWND active_window = GetForegroundWindow();
    DWORD active_pid = 0;
    GetWindowThreadProcessId(active_window, &active_pid);
    // HANDLE active_handle = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, FALSE, active_pid);
    // char active_pname[MAX_PATH] = {0};
    // // GetProcessImageFileNameA(active_handle, active_pname, sizeof(active_pid));
    // char strExePath[MAX_PATH] = {0};
    // char strPath[MAX_PATH] = {0};
    // GetModuleFileName(NULL, strPath, MAX_PATH + 1);
    cout << active_pid << endl;
}

int main()
{
    GetActWindowPid();
    return 0;
}
