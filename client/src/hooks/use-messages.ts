import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { type InsertMessage, type Message } from "@/lib/api-mock";
import { useToast } from "@/hooks/use-toast";

export function useMessages() {
  const { toast } = useToast();

  const messagesQuery = useQuery<Message[]>({
    queryKey: ["/api/messages"],
  });

  const createMessageMutation = useMutation({
    mutationFn: async (data: InsertMessage) => {
      return await apiRequest("POST", "/api/messages", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      toast({
        title: "Success",
        description: "Your message has been sent successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    messages: messagesQuery.data ?? [],
    isLoading: messagesQuery.isLoading,
    createMessage: createMessageMutation.mutate,
    isSubmitting: createMessageMutation.isPending,
  };
}
