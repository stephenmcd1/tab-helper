using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Description;

namespace TabHelperHost
{
    public static class HostCommunication
    {
        public static void SendArgs(List<string> args)
        {
            new ServiceProxy().InvokeSendArgs(args);
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