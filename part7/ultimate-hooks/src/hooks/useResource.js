const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  // Fetch all resources
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(baseUrl);
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
    fetchResources();
  }, [baseUrl]);

  // Create a new resource
  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource);
      setResources(resources.concat(response.data));
    } catch (error) {
      console.error('Error creating resource:', error);
    }
  };

  // Update a resource
  const update = async (id, newObject) => {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, newObject);
      setResources(resources.map(resource =>
        resource.id === id ? response.data : resource
      ));
    } catch (error) {
      console.error('Error updating resource:', error);
    }
  };

  const service = {
    create,
    update
  };

  return [resources, service];
};
