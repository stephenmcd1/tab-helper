using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Description;
using System.Windows.Forms;

namespace TabHelperHost
{
    public static class HostCommunication
    {
        public static void SendArgs(List<string> args)
        {
            try
            {
                new ServiceProxy().InvokeSendArgs(args);
            }
            catch(EndpointNotFoundException)
            {
                //TODO: If we can't connect, perhaps we should just try to launch Chrome?  For now, just throw our hands up and give the user a message
                MessageBox.Show("Could not connect to the Tab Controller Chrome Extension.  Make sure Chrome is running and the extension is enabled and then try again.", "Could not connect to extension", MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
            }
        }

        private class ServiceProxy : ClientBase<IService>
        {
            public ServiceProxy()
                : base(new ServiceEndpoint(ContractDescription.GetContract(typeof(IService)),
                    new NetNamedPipeBinding(), new EndpointAddress("net.pipe://localhost/" +  Program.UniqueAppName + "/svc")))
            {

            }
            public void InvokeSendArgs(List<string> args)
            {
                Channel.SendArgs(args);
            }
        }

    }
}