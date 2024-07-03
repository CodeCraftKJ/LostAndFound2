namespace LostAndFound.Server.Entities
{
    public class FoundItem
    {
        public int FoundItemID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime DateFound { get; set; }
        public int UserID { get; set; }
        public User User { get; set; }
    }
}
